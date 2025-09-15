// src/components/Header.tsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { useAuth } from "../lib/AuthContext";

const Header = () => {
  const { userId, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-sm dark:border-neutral-800/80 dark:bg-neutral-950/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: 15 }}>
            {/* TODO: replace this with an SVG logo */}
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
          </motion.div>
          <span className="hidden text-xl font-bold sm:inline-block">
            Bazaar
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {!userId ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-200/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100"
              >
                <FiLogIn />
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden items-center gap-2 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg focus-visible:ring-purple-500 px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-neutral-50 dark:text-neutral-900 sm:flex"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                aria-label="User account"
                className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800"
              >
                <FiUser className="mx-auto h-5 w-5" />
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={signOut}
                className="flex items-center gap-2 rounded-md bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/20 dark:text-red-400"
              >
                <FiLogOut />
                Sign Out
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
