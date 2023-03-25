import numpy as np
import pandas as pd
import pickle
import tiktoken
import openai
import os

EMBEDDING_MODEL = "text-embedding-ada-002"


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
