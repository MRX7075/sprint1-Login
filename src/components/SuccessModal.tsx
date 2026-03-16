import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import thumbsAnimation from "@/assets/thumb-success.json";

const SuccessModal: React.FC = () => {
  const navigate = useNavigate();

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resize = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      {/* Confetti */}
      <Confetti
        width={size.width}
        height={size.height}
        numberOfPieces={200}
        recycle={false}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-[420px] text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Congratulations!
        </h2>

        <p className="text-gray-500 mb-6">
          Your Password has been changed successfully.
        </p>

        {/* Animated Thumbs Up */}
        <div className="flex justify-center mb-6">
          <div className="w-40">
            <Lottie
              animationData={thumbsAnimation}
              loop={false}
            />
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          Continue with login to view information
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          Go to Login
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessModal;