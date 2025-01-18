import { db } from "@/firebase/firebaseClient";
import { Form } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  QueryConstraint,
  startAt,
} from "firebase/firestore";

const ITEMS_PER_PAGE = 10;

type GetDataProps = {
  tags: string[];
  sortByCopyCount: boolean;
};

type GetFormsResponseType = {
  forms: Form[];
  nextPage: number | undefined;
  totalCount: number;
};

export function useGetForms({ tags, sortByCopyCount }: GetDataProps) {
  return useInfiniteQuery({
    queryKey: ["forms", tags, sortByCopyCount],
    queryFn: async ({ pageParam = 1 }): Promise<GetFormsResponseType> => {
      try {
        // Calculate the offset
        const offset = (pageParam - 1) * ITEMS_PER_PAGE;

        // Create an array to hold all query constraints
        const queryConstraints: QueryConstraint[] = [limit(ITEMS_PER_PAGE)];

        // Add sorting constraint
        if (sortByCopyCount) {
          queryConstraints.push(orderBy("CopiedCount", "desc"));
        } else {
          queryConstraints.push(orderBy("Title", "asc"));
        }

        // Add tags filter only if tags array is not empty
        if (tags && tags.length > 0) {
          queryConstraints.push(where("tags", "array-contains-any", tags));
        }

        // Create the query with all constraints
        const formsQuery = query(collection(db, "forms"), ...queryConstraints);

        // Get total count (for first page only)
        let totalCount = 0;
        if (pageParam === 1) {
          const countSnapshot = await getDocs(formsQuery);
          totalCount = countSnapshot.size;
        }

        // Add offset using startAt
        if (offset > 0) {
          const offsetQuery = query(formsQuery, startAt(offset));
          const snapshot = await getDocs(offsetQuery);
          const forms = snapshot.docs.map((doc) => doc.data()) as Form[];

          return {
            forms,
            nextPage:
              forms.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
            totalCount,
          };
        }

        // Get the documents for first page
        const snapshot = await getDocs(formsQuery);
        const forms = snapshot.docs.map((doc) => doc.data()) as Form[];

        return {
          forms,
          nextPage: forms.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
          totalCount,
        };
      } catch (error) {
        console.error("Error fetching forms:", error);
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    gcTime: 300 * 1000, // 5 minutes
    staleTime: 60 * 1000, // 1 minute
  });
}
