import sys
sys.path.append("/Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages")


import numpy as np
import pandas as pd
import pickle
import tiktoken
import openai
import os

EMBEDDING_MODEL = "text-embedding-ada-002"

MAX_SECTION_LEN = 500
SEPARATOR = "\n* "
ENCODING = "gpt2"  # encoding for text-davinci-003

encoding = tiktoken.get_encoding(ENCODING)
separator_len = len(encoding.encode(SEPARATOR))

f"Context separator contains {separator_len} tokens"


class Embeddings():

    def create_df(captions):
        df = pd.DataFrame()
        start = 0
        end = 500
        rows = []
        while captions_clip != '':
            captions_clip = captions[start:end]
            rows.append(captions_clip)
            start = end
            end += 500
        df['Text'] = rows
        return df

    def get_embedding(text, model):
        result = openai.Embedding.create(
            model,
            text
        )
        return result["data"][0]["embedding"]

    def compute_doc_embeddings(df):
        return {
            idx: Embeddings.get_embedding(r.content) for idx, r in df.iterrows()
        }


    



    def vector_similarity(x, y):

        return np.dot(np.array(x), np.array(y))


    def order_document_sections_by_query_similarity(query, contexts: dict[np.array]):
        query_embedding = get_embedding(query)
        
        document_similarities = sorted([
            (vector_similarity(query_embedding, doc_embedding), doc_index) for doc_index, doc_embedding in contexts.items()
        ], reverse=True)
        
        return document_similarities







    def construct_prompt(question, context_embeddings, df):
        """
        Fetch relevant 
        """
        most_relevant_document_sections = order_document_sections_by_query_similarity(question, context_embeddings)
        
        chosen_sections = []
        chosen_sections_len = 0
        chosen_sections_indexes = []
        
        for _, section_index in most_relevant_document_sections:
            # Add contexts until we run out of space.        
            document_section = df.loc[section_index]
            
            chosen_sections_len += document_section.tokens + separator_len
            if chosen_sections_len > MAX_SECTION_LEN:
                break
                
            chosen_sections.append(SEPARATOR + document_section.content.replace("\n", " "))
            chosen_sections_indexes.append(str(section_index))
                
        # Useful diagnostic information
        print(f"Selected {len(chosen_sections)} document sections:")
        print("\n".join(chosen_sections_indexes))
        
        header = """Answer the question as truthfully as possible using the provided context, and if the answer is not contained within the text below, say "I don't know."\n\nContext:\n"""
        
        return header + "".join(chosen_sections) + "\n\n Q: " + question + "\n A:"