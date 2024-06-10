

def prepare_data(message: str, questions: list, answers: list) -> str:
    combined_pairs = [f"{q}:{a}" for q, a in zip(questions, answers)]
    result_string = message + ', '.join(combined_pairs)
    print(result_string)
    print(answers)
    return result_string
