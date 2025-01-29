# Python program to insert given element in an array
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
        print(arr[i], end=" ")
