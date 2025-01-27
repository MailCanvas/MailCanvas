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
  DocumentData,
  startAfter,
} from "firebase/firestore";

const ITEMS_PER_PAGE = 12;

type GetDataProps = {
  sortByCopyCount: boolean;
  tag: string;
};

type PageParam = {
  page: number;
  lastDoc: DocumentData | null;
};

type GetFormsResponseType = {
  forms: Form[];
  currentPage: number;
  lastDoc: DocumentData | null;
};

export function useGetForms({ sortByCopyCount, tag }: GetDataProps) {
  return useInfiniteQuery({
    queryKey: ["forms", sortByCopyCount],
    queryFn: async ({
      pageParam = { page: 1, lastDoc: null },
    }): Promise<GetFormsResponseType> => {
      try {
        // Create an array to hold all query constraints
        const queryConstraints: QueryConstraint[] = [limit(ITEMS_PER_PAGE)];

        // Add sorting constraint
        if (sortByCopyCount) {
          queryConstraints.push(orderBy("CopiedCount", "desc"));
        } else {
          queryConstraints.push(orderBy("timestamp", "desc"));
        }

        // If we have a lastDoc, add startAfter constraint
        if (pageParam.lastDoc) {
          queryConstraints.push(startAfter(pageParam.lastDoc));
        }

        // Create the query with all constraints
        const formsQuery = query(
          collection(db, "forms"),
          where("IsValid", "==", true),
          ...queryConstraints,
          ...(tag ? [where("tags", "array-contains", tag)] : [])
        );

        // Get the documents
        const snapshot = await getDocs(formsQuery);

        // Get the last document for next page
        const lastDoc = snapshot.empty
          ? null
          : snapshot.docs[snapshot.docs.length - 1];

        // Transform the documents into our Form type
        const forms = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Form[];

        return {
          forms,
          currentPage: pageParam.page,
          lastDoc,
        };
      } catch (error) {
        throw error;
      }
    },
    initialPageParam: { page: 1, lastDoc: null },
    getNextPageParam: (lastPage): PageParam | undefined => {
      if (!lastPage.lastDoc || lastPage.forms.length < ITEMS_PER_PAGE) {
        return undefined;
      }
      return {
        page: lastPage.currentPage + 1,
        lastDoc: lastPage.lastDoc,
      };
    },
    gcTime: 300 * 1000, // 5 minutes
    staleTime: 60 * 1000, // 1 minute
  });
}
