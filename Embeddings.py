import numpy as np
import pandas as pd
import pickle
import tiktoken
import openai
import os

EMBEDDING_MODEL = "text-embedding-ada-002"

class Embeddings():

    def get_embedding(text, model):
        result = openai.Embedding.create(
            model,
            text
        )
        return result["data"][0]["embedding"]

    def compute_doc_embeddings(df):
        return {
            idx: get_embedding(r.content) for idx, r in df.iterrows()
        }
    
