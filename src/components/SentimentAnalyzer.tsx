import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LoadingSpinner from "./LoadingSpinner";
import SentimentResult from "./SentimentResult";
import { toast } from "@/hooks/use-toast";
import { Sparkles, AlertCircle } from "lucide-react";

const NEGATIVE_EXAMPLES = [
  "The new update broke everything. Waste of money, I wish I never bought this. This product stopped working after just two days. The sound quality is horrible and distorted. I hate how slow this device has become.",
  "Terrible user interface — so confusing to use. This app is useless, nothing works as expected. The website keeps freezing on checkout. I regret downloading this app. Poor design and bad customer experience.",
  "This company doesn't care about its customers. They never deliver on their promises. Their marketing is misleading and dishonest. Very disappointed by how they handled my complaint. They keep ignoring user feedback.",
  "This brand used to be great, but now it's trash. Feels like a scam. I don't trust this brand anymore. Their service quality keeps getting worse. Totally unreliable and frustrating experience.",
  "App keeps lagging and crashing. Too many errors and bugs after the update. Login issues every single day. Performance has dropped significantly. The system is so slow, it's painful to use.",
  "The new version is full of glitches. It constantly freezes when I try to use it. Update made the app worse than before. Notifications don't work properly. The product overheats after a few minutes of use.",
  "This is absolutely terrible and awful. I'm extremely disappointed and frustrated. Everything is broken and useless. Worst purchase ever, complete waste of money. Never buying from this horrible company again.",
  "Disgusting quality and pathetic service. They are incompetent and dishonest. This garbage product is worthless trash. I'm furious and devastated by this nightmare experience. Total disaster and complete failure.",
  "Horrible, dreadful, and miserable experience from start to finish. Abysmal quality, toxic customer service, and despicable business practices. This wretched product is utterly useless and disgraceful.",
  "Atrocious performance with deplorable results. Everything crashes constantly and fails miserably. Shameful quality and appalling support. This catastrophic mess ruined everything. Absolutely dreadful and hopeless.",
];

const SentimentAnalyzer = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSentiment(null);

    try {
      const response = await axios.post("https://sentiment-backend-c4tc.onrender.com/api/predict/", {
        text: text.trim(),
      });

      setSentiment(response.data.sentiment);
      toast({
        title: "Analysis Complete",
        description: "Sentiment has been successfully analyzed",
      });
    } catch (error: any) {
      console.error("Error analyzing sentiment:", error);
      
      if (error.response?.data?.text) {
        toast({
          title: "Validation Error",
          description: error.response.data.text[0],
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to analyze sentiment. Please make sure the backend is running.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setSentiment(null);
  };

  const handleExampleClick = (example: string) => {
    setText(example);
    setSentiment(null);
    toast({
      title: "Example Loaded",
      description: "Click 'Analyze Sentiment' to test this example",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Group 4 Project
          </h1>
          <p className="text-lg font-semibold text-foreground">
            Moringa School
          </p>
          <p className="text-muted-foreground text-base">
            AI-powered sentiment analysis in real-time
          </p>
        </div>

        {/* Model Performance Notice */}
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-foreground">Model Performance Notice</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Our model is currently not performing perfectly on negative sentiment classification. 
            We are actively working on improving the negative class accuracy through enhanced training data and advanced NLP techniques. 
            Thank you for your patience as we continue to refine the model.
          </AlertDescription>
        </Alert>

        {/* Main Card */}
        <Card className="p-6 md:p-8 bg-gradient-card shadow-card border-border/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="text-input" className="text-sm font-medium text-foreground">
                Enter your text
              </label>
              <Textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here... (e.g., 'I absolutely love this product!')"
                className="min-h-[200px] resize-none bg-input border-border focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{text.length} characters</span>
                {text.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={!text.trim() || isLoading}
              className="w-full bg-gradient-primary hover:opacity-90 transition-all shadow-glow disabled:opacity-50 disabled:shadow-none h-12 text-base font-semibold"
            >
              {isLoading ? "Analyzing..." : "Analyze Sentiment"}
            </Button>
          </form>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-8">
              <LoadingSpinner />
            </div>
          )}

          {/* Result Display */}
          {!isLoading && sentiment && (
            <div className="mt-8 animate-in fade-in-50 duration-500">
              <SentimentResult sentiment={sentiment} />
            </div>
          )}
        </Card>

        {/* Test Examples Section */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Try These Negative Examples</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Click any example below to test the sentiment analysis model with realistic negative feedback
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {NEGATIVE_EXAMPLES.map((example, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:bg-negative/10 border border-border hover:border-negative transition-all px-4 py-3 rounded-md text-sm"
                  onClick={() => handleExampleClick(example)}
                >
                  {example}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* About Model Improvement Section */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50 backdrop-blur-sm">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              About Our NLP Sentiment Model
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our sentiment analysis model was built using Natural Language Processing (NLP) techniques to understand how users feel about products and services on Twitter.
                The model currently classifies tweets as <strong className="text-positive">Positive</strong> or <strong className="text-negative">Negative</strong>.
              </p>

              <p>
                We are continuously improving the model by collecting more data, refining preprocessing, and balancing the training examples.
                Future updates will use advanced AI techniques such as:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-foreground">Deep Learning Models</strong> like BERT and LSTMs for contextual understanding.</li>
                <li><strong className="text-foreground">Sentiment Calibration</strong> to better detect subtle emotions and sarcasm.</li>
                <li><strong className="text-foreground">Continuous Learning</strong> from new user-submitted examples.</li>
              </ul>

              <p className="pt-2">
                Our goal is to make the model more accurate, fair, and context-aware — ensuring that both positive and negative sentiments are understood equally well.
              </p>
            </div>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Powered by advanced machine learning algorithms</p>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalyzer;
