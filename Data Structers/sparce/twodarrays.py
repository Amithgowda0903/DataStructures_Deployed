
import numpy as np
#creating 2D array without any package
arr1 = [[0]*3]*2
print("array without package")
print(arr1)
print(type(arr1))
 
#creating 2D array with numpy package
print("\n")
arr2 = np.array([[1,2,3,4], [5,6,7,8]])
print("array with package")
print(arr2)
print(type(arr2))

#3D array
print("3D array")
arr3= np.array([[[1,2,3],[3,4,5]],
                   [[6,7,8],[9,8,7]],
                   [[6,5,4],[3,2,1]]])
 
print("Output 3 D ")
print(arr3)
print(type(arr3))




