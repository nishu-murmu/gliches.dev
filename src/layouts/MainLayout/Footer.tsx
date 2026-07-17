import { siteConfig } from "../../config/site";

const { profile, footer } = siteConfig;

const Footer = () => {
  return (
    <footer className="mt-4 text-xs">
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              &copy; {new Date().getFullYear()} {profile.name}. {footer.rightsText}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {footer.builtWithLabel}{" "}
              <a
                href={footer.frameworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {footer.frameworkName}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
