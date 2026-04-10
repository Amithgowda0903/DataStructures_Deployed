window.DATA_STRUCTURE_NOTES = [
  {
    title: "Array insertion loop",
    category: "Basics",
    path: "Data Structers/array_insertion_loop.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/array_insertion_loop.py",
    summary: "Shows how to insert a new item into a fixed-size array by shifting elements to the right.",
    code: `# Python program to insert given element in an array
import array
arr=array.array('i',[0]*20)
size=int(input("enter the size<20"))
for i in range(0,size,1):
        element=int(input("enter the element of array:"))
        arr[i]=element
pos=int(input("enter the position"))
new_ele=int(input("enter the new element"))
for i in range(size,pos,-1):
        arr[i]=arr[i-1]
arr[pos]=new_ele
size=size+1

print("Array after insertion")
for i in range(0,size,1):
        print(arr[i], end=" ")`
  },
  {
    title: "Linear search",
    category: "Searching",
    path: "Data Structers/linearsearch.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/linearsearch.py",
    summary: "Checks whether a number exists in a list of prime values using a simple scan.",
    code: `import array
primes=array.array('i', [2, 3, 5, 7, 11, 13, 17, 19])

for i in range(0,len(primes)-1):
    print(primes[i])
print("end")

x=int(input('enter a number'))
flag=0
for i in range(0,len(primes)-1):
               if x==primes[i]:
                   flag=1
                   break
if flag==1:
    print('element found')
else:
    print('element not found')`
  },
  {
    title: "Binary search",
    category: "Searching",
    path: "Data Structers/sparce/Binarysearch.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/sparce/Binarysearch.py",
    summary: "Uses the classic low, mid, and high window to find a value inside a sorted list.",
    code: `# Iterative Binary Search Function
# It returns index of x in given array arr if present,
# else returns -1
def binary_search(arr, x):
    low = 0
    high = len(arr) - 1
    mid = 0
 
    while low <= high:
 
        mid = (high + low) // 2
 
        # If x is greater, ignore left half
        if arr[mid] < x:
            low = mid + 1
 
        # If x is smaller, ignore right half
        elif arr[mid] > x:
            high = mid - 1
 
        # means x is present at mid
        else:
            return mid
 
    # If we reach here, then the element was not present
    return -1`
  },
  {
    title: "Bubble sort",
    category: "Sorting",
    path: "Data Structers/sorting/bubblesort.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/sorting/bubblesort.py",
    summary: "Compares neighboring items repeatedly and stops early when no swap happens.",
    code: `def bubble_sort(arr):
  
    # Outer loop to iterate through the list n times
    for n in range(len(arr) - 1, 0, -1):
        
        # Initialize swapped to track if any swaps occur
        swapped = False  

        # Inner loop to compare adjacent elements
        for i in range(n-i):
            if arr[i] > arr[i + 1]:
              
                # Swap elements if they are in the wrong order
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                
                # Mark that a swap has occurred
                swapped = True
        
        # If no swaps occurred, the list is already sorted
        if not swapped:
            break`
  },
  {
    title: "Insertion sort",
    category: "Sorting",
    path: "Data Structers/sorting/insertion sort.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/sorting/insertion%20sort.py",
    summary: "Builds the sorted section one item at a time by shifting larger values right.",
    code: `def insertionSort(arr):
    n = len(arr)  # Get the length of the array
    for current in range(1, n):
        temp = arr[current]
        comp=current-1;
        while comp>=0:
            if temp<arr[comp]:
                arr[comp+1]=arr[comp]
                comp=comp-1
                
            else:
                break
            
        arr[comp+1]=temp`
  },
  {
    title: "Merge sort",
    category: "Sorting",
    path: "Data Structers/sorting/Mergesort.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/sorting/Mergesort.py",
    summary: "Splits the array into halves, sorts both sides, and merges them back together.",
    code: `def merge(arr, left, mid, right):
    n1 = mid - left + 1
    n2 = right - mid

    # Create temp arrays
    L = [0] * n1
    R = [0] * n2

    # Copy data to temp arrays L[] and R[]
    for i in range(n1):
        L[i] = arr[left + i]
    for j in range(n2):
        R[j] = arr[mid + 1 + j]`
  },
  {
    title: "Public attributes example",
    category: "OOP",
    path: "Data Structers/publiceasyexample.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/publiceasyexample.py",
    summary: "Shows public class and instance attributes that can be read and modified directly.",
    code: `class Student:
    schoolName = 'XYZ School'  # Class attribute

    def __init__(self, name, age):
        self.name = name  # Instance attribute
        self.age = age    # Instance attribute

std = Student("Steve", 25)
print(std.schoolName)  # 'XYZ School'
print(std.name)       # 'Steve'
std.age = 20
print(std.age)        # 20`
  },
  {
    title: "Self example",
    category: "OOP",
    path: "Data Structers/self_example.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/self_example.py",
    summary: "Minimal class example that stores a value on the object and prints it.",
    code: `class Mynumber:
    def __init__(self, value):
        self.value = value
    
    def print_value(self):
        print(self.value)

obj1 = Mynumber(17)
obj1.print_value()`
  },
  {
    title: "Polymorphism example",
    category: "OOP",
    path: "Data Structers/polymorphismwithclass.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/polymorphismwithclass.py",
    summary: "Demonstrates method names shared across classes with different behavior.",
    code: `class India():
    def capital(self):
        print("New Delhi is the capital of India.")

    def language(self):
        print("Hindi is the most widely spoken language of India.")

    def type(self):
        print("India is a developing country.")`
  },
  {
    title: "Private members example",
    category: "OOP",
    path: "Data Structers/privatevariableexample2.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/privatevariableexample2.py",
    summary: "Shows name mangling and how private members are hidden inside a class.",
    code: `# program to illustrate private access modifier in a class

class Geek:

    # private members
    __name = None
    __roll = None
    __branch = None`
  },
  {
    title: "Protected attributes example",
    category: "OOP",
    path: "Data Structers/protectedeasyexample.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/protectedeasyexample.py",
    summary: "Uses underscore-prefixed members to show convention-based protected access.",
    code: `class Student:
    _schoolName = 'XYZ School'  # Protected class attribute

    def __init__(self, name, age):
        self._name = name  # Protected instance attribute
        self._age = age    # Protected instance attribute`
  },
  {
    title: "Protected variable example",
    category: "OOP",
    path: "Data Structers/Protectedvariableexample.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/Protectedvariableexample.py",
    summary: "Demonstrates a protected member inherited by a derived class.",
    code: `# Python program to
# demonstrate protected members

# Creating a base class
class Base:
    def __init__(self):

        # Protected member
        self._a = 2`
  },
  {
    title: "Two-dimensional arrays",
    category: "Sparse / Matrices",
    path: "Data Structers/sparce/twodarrays.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/sparce/twodarrays.py",
    summary: "Compares plain nested lists and NumPy arrays, then shows a 3D array example.",
    code: `import numpy as np
#creating 2D array without any package
arr1 = [[0]*3]*2
print("array without package")
print(arr1)
print(type(arr1))`
  },
  {
    title: "Sparse matrix with CSR",
    category: "Sparse / Matrices",
    path: "Data Structers/sparce/Sparsematrix.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/sparce/Sparsematrix.py",
    summary: "Builds a sparse matrix using scipy.sparse.csr_matrix and prints the array form.",
    code: `# Python program to create 
# sparse matrix using csr_matrix() 
  
# Import required package 
import numpy as np 
from scipy.sparse import csr_matrix 
  
# Creating a 3 * 4 sparse matrix 
sparseMatrix = csr_matrix((3, 4),  
                          dtype = np.int8).toarray()`
  },
  {
    title: "Sparse matrix from coordinates",
    category: "Sparse / Matrices",
    path: "Data Structers/sparce/sparse_using_csr.py",
    githubUrl: "https://github.com/Amithgowda0903/Data-Structures/blob/main/Data%20Structers/sparce/sparse_using_csr.py",
    summary: "Creates a sparse matrix from row, column, and data arrays.",
    code: `# Python program to create 
# sparse matrix using csr_matrix() 
  
# Import required package 
import numpy as np 
from scipy.sparse import csr_matrix 
  
row = np.array([0, 0, 1, 1, 2, 1]) 
col = np.array([0, 1, 2, 0, 2, 2])`
  }
];
