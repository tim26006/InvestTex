


def prepare_data_to_compare(all_data):
    resp =""
    # Iterate over each item in the dictionary
    for item in all_data.values():
        # Join the list into a string with ';' as the delimiter
        combined_data = ','.join(item)
        # Print the combined string
        resp= resp+ combined_data +";"
    return  resp