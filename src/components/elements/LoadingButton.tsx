import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
  isLoading: boolean;
  onClick: () => void;
  label: string;
  loadingLabel: string;
  className?: string;
  disabled?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  onClick,
  label,
  loadingLabel,
  className = "",
  disabled = false,
}) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      disabled={isLoading || disabled}>
      {isLoading ? (
        <>
          {loadingLabel}
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default LoadingButton;
