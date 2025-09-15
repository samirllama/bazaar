// src/components/Footer.tsx

import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => (
  <footer className="border-t border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-950">
    <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
      <p className="text-sm text-neutral-500">
        © {new Date().getFullYear()} Bazaar. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a
          href="#"
          aria-label="GitHub"
          className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          <FiGithub className="h-5 w-5" />
        </a>
        <a
          href="#"
          aria-label="Twitter"
          className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          <FiTwitter className="h-5 w-5" />
        </a>
        <a
          href="#"
          aria-label="LinkedIn"
          className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          <FiLinkedin className="h-5 w-5" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
