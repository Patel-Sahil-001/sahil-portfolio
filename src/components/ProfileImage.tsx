import { motion } from 'framer-motion';


export default function ProfileImage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Profile Image Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem] lg:w-[40rem] lg:h-[32rem]"
      >
        {/* Profile Image */}
        <img
          src="/profile-photo.png"
          alt="Sahil Patel"
          className="w-full h-full rounded-[50%] object-cover"
        />
      </motion.div>
    </div>
  );
}
