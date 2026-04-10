def insertionSort(arr):
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
            
        arr[comp+1]=temp        
   
  
# Sorting the array [12, 11, 13, 5, 6] using insertionSort
arr = [120, -11, 13, -5, 0]
insertionSort(arr)
print(arr)
