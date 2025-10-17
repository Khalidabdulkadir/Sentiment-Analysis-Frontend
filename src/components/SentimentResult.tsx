import { Smile, Frown, Meh } from "lucide-react";

interface SentimentResultProps {
  sentiment: string;
}

const SentimentResult = ({ sentiment }: SentimentResultProps) => {
  const sentimentLower = sentiment.toLowerCase();
  
  const getSentimentConfig = () => {
    switch (sentimentLower) {
      case "positive":
        return {
          icon: Smile,
          text: "Positive",
          gradient: "bg-positive",
          bgLight: "bg-positive-light",
          color: "text-positive-foreground",
          textColor: "text-positive",
          description: "This text expresses positive sentiment",
          borderColor: "border-positive",
        };
      case "negative":
        return {
          icon: Frown,
          text: "Negative",
          gradient: "bg-negative",
          bgLight: "bg-negative-light",
          color: "text-negative-foreground",
          textColor: "text-negative",
          description: "This text expresses negative sentiment",
          borderColor: "border-negative",
        };
      default:
        return {
          icon: Meh,
          text: sentiment,
          gradient: "bg-muted",
          bgLight: "bg-muted",
          color: "text-muted-foreground",
          textColor: "text-muted-foreground",
          description: "Sentiment analysis complete",
          borderColor: "border-muted",
        };
    }
  };

  const config = getSentimentConfig();
  const Icon = config.icon;

  return (
    <div className={`border-2 ${config.borderColor} ${config.bgLight} rounded-lg p-6 space-y-4`}>
      <div className="flex items-center justify-center space-x-4">
        <div className={`${config.gradient} p-4 rounded-full shadow-lg`}>
          <Icon className={`w-10 h-10 ${config.color}`} strokeWidth={2.5} />
        </div>
        <div className="text-left">
          <h3 className={`text-2xl font-bold ${config.textColor}`}>
            {config.text}
          </h3>
          <p className="text-sm text-muted-foreground">
            Sentiment Detected
          </p>
        </div>
      </div>

      <div className="text-center pt-2">
        <p className="text-muted-foreground">
          {config.description}
        </p>
      </div>
    </div>
  );
};

export default SentimentResult;
