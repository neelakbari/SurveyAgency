import { Input } from "antd";

const { TextArea } = Input;

const Textarea = ({ disabled, answer, handleAnswer, setError }) => {
  return (
    <div className="textbox">
      <TextArea
        onFocus={() => setError("")}
        onChange={(e) => handleAnswer(e.target.value)}
        disabled={disabled}
        rows={4}
        type="textarea"
        value={answer}
        placeholder="Type your answer here..."
      />
    </div>
  );
};

export default Textarea;
