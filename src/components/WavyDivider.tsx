const WavyDivider = () => {
  return (
    <div className="absolute inset-y-0 left-0 w-[120px] z-10">
      <svg
        viewBox="0 0 120 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M120 0 
             C120 0, 120 50, 100 100 
             C80 150, 40 180, 30 250 
             C20 320, 80 350, 90 420 
             C100 490, 50 530, 40 580 
             C30 630, 70 680, 80 720 
             C90 760, 60 800, 50 850 
             C40 900, 120 900, 120 900 
             L120 0Z"
          fill="hsl(0, 0%, 100%)"
        />
      </svg>
    </div>
  );
};

export default WavyDivider;
