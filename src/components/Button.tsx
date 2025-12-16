interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

function Button({ text, disabled = false, onClick }: ButtonProps) {
  return (
    <button className="fantasy-button" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;