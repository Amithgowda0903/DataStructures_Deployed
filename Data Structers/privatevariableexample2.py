# program to illustrate private access modifier in a class

class Geek:

    # private members
    __name = None
    __roll = None
    __branch = None

    # constructor
    def __init__(self, name, roll, branch):
        self.__name = name
        self.__roll = roll
        self.__branch = branch

    # private member function
    def __displayDetails(self):

        # accessing private data members
        print("Name:", self.__name)
        print("Roll:", self.__roll)
        print("Branch:", self.__branch)

    # public member function
    def accessPrivateFunction(self):

        # accessing private member function
        self.__displayDetails()

# creating object
obj = Geek("R2J", 1706256, "Information Technology")



# Throws error
#print(obj.__name)
#print(obj.__roll)
# obj.__branch
# obj.__displayDetails()

# To access private members of a class
print(obj._Geek__name)
print(obj._Geek__roll)
print(obj._Geek__branch)
obj._Geek__displayDetails()

print("")

# calling public member function of the class
obj.accessPrivateFunction()
