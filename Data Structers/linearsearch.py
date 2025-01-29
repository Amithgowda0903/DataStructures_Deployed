import array
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
    print('element not found')
    
