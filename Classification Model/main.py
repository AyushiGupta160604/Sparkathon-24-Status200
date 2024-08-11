from flask import Flask, request, jsonify
from transformers import BertTokenizer, BertForSequenceClassification
import torch

app = Flask(__name__)

# Load the model and tokenizer
model = BertForSequenceClassification.from_pretrained('/MCTS-main/MCTS-main/Classification Model/model2')
tokenizer = BertTokenizer.from_pretrained('/MCTS-main/MCTS-main/Classification Model/tokenizer2')

def classify_text(text, model, tokenizer, max_len=128):
    encoding = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=max_len,
        return_token_type_ids=False,
        padding='max_length',
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt',
    )

    input_ids = encoding['input_ids']
    attention_mask = encoding['attention_mask']

    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)

    logits = outputs.logits
    predictions = torch.argmax(logits, dim=-1).item()

    class_labels = ['garbage', 'useful']
    return class_labels[predictions]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    # print(data)
    text = data.get('text', '')
    prediction = classify_text(text, model, tokenizer)
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
