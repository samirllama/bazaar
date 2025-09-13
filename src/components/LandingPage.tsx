import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaTag } from "react-icons/fa";
import { motion } from "framer-motion";

const cardStyles =
  "cursor-pointer rounded-2xl border border-white/50 bg-white/30 p-8 shadow-lg backdrop-blur-md transition-transform hover:scale-105 hover:bg-white/50 max-w-sm hover:shadow-2xl transition flex flex-col items-center text-center ";

export const LandingPage = () => {
  const navigate = useNavigate();
  const cards = [
    {
      icon: <FaBoxOpen className="text-5xl text-blue-600 mb-4" />,
      title: "Products",
      desc: "Browse all products available in the marketplace",
      action: () => navigate("/products"),
    },
    {
      icon: <FaTag className="text-5xl text-green-600 mb-4" />,
      title: "Sell Products",
      desc: "Start a new listing and put your products on sale",
      action: () => navigate("/sell"),
    },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-blue-50 to-green-100 items-center gap-8 flex flex-col w-full mx-auto min-w-[60ch] md:min-w-[120ch]">
      <header className="text-center mt-20 mb-12 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Bazaar
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          A simple yet powerful marketplace experience. Browse products or start
          selling yours in just a few clicks.
        </p>
      </header>
      <main className="flex flex-col items-center gap-10 md:flex-row md:justify-center px-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            className={cardStyles}
            onClick={card.action}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            {card.icon}
            <h2 className="mb-2">{card.title}</h2>
            <p>{card.desc}</p>
          </motion.div>
        ))}
      </main>
    </div>
  );
};
