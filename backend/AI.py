from transformers import GPT2LMHeadModel, GPT2Tokenizer, TextDataset, DataCollatorForLanguageModeling, Trainer, TrainingArguments


class AI_ASSISTANT:
    def __init__(self):
        self.model = GPT2LMHeadModel.from_pretrained('fine_tuned_model')
        self.tokenizer = GPT2Tokenizer.from_pretrained('fine_tuned_model')

    def generate_response(self, prompt, max_length=150):
        inputs = self.tokenizer.encode(prompt, return_tensors='pt')
        outputs = self.model.generate(inputs, max_length=max_length, num_return_sequences=1)
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)

    def get_answer(self, user_request:str)->str:
        response =(((((self.generate_response( f"User: {user_request}\nBot:", max_length=150)).split("Название площадки:")) [1]).split("User:"))[0]).strip()
        return  response




