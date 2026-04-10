# Python program to create 
# sparse matrix using csr_matrix() 
  
# Import required package 
import numpy as np 
from scipy.sparse import csr_matrix 
  
# Creating a 3 * 4 sparse matrix 
sparseMatrix = csr_matrix((3, 4),  
                          dtype = np.int8).toarray() 
  
# Print the sparse matrix 
print(sparseMatrix)
print(type(sparseMatrix))
