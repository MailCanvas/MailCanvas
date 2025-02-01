const Footer = () => {
  const teamMembers = [
    {
      name: "심병건",
      department: "글로벌경영학과",
      email: "simbg17@g.skku.edu",
      github: "xeonsim",
    },
    {
      name: "문태주",
      department: "데이터사이언스융합전공",
      email: "pp2lycee@naver.com",
      github: "taeju-moon",
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-green-300 to-purple-300 text-white py-8 px-6 shadow-2xl">
      <h1 className="text-3xl font-extrabold">Contact</h1>
      <div className="container mx-auto space-y-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between hover:bg-white/20 transition-all duration-300 ease-in-out"
          >
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.department}</p>
            </div>

            <div className="flex space-x-4 items-center flex-wrap justify-center gap-3">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{member.email}</span>
              </a>

              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gray-800 hover:bg-black px-4 py-2 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>{member.github}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
