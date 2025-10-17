const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-accent rounded-full animate-spin"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-2 bg-primary/10 rounded-full blur-md"></div>
      </div>
      
      <div className="text-center space-y-1">
        <p className="text-foreground font-medium">Analyzing sentiment...</p>
        <p className="text-sm text-muted-foreground">This will only take a moment</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
