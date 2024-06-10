from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Load the fine-tuned model and tokenizer


# Function to generate multiple responses
def generate_responses(prompt, max_length=50, num_beams=5, num_return_sequences=3):
    model = GPT2LMHeadModel.from_pretrained('fine_tuned_model')
    tokenizer = GPT2Tokenizer.from_pretrained('fine_tuned_model')
    inputs = tokenizer.encode(prompt, return_tensors='pt')
    outputs = model.generate(
        inputs,
        max_length=max_length,
        num_beams=num_beams,
        num_return_sequences=num_return_sequences,
        early_stopping=True
    )
    return [tokenizer.decode(output, skip_special_tokens=True) for output in outputs]


def place_names(user_request):
    names = []
    responses = generate_responses(f"User: {user_request}\nBot:", max_length=150)
    for i, response in enumerate(responses, 1):
        names.append(((((response.split("Bot: Название площадки:"))[1]).split("\n"))[0]).strip())
    print(names)
    return names


