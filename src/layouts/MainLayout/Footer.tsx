const Footer = () => {
  return (
    <footer className="mt-4 text-xs">
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              &copy; {new Date().getFullYear()} Nishu Murmu. All rights
              reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Built with{" "}
              <a
                href="https://astro.build"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Astro
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
