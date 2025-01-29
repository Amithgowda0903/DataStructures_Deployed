class Student:
    schoolName = 'XYZ School'  # Class attribute

    def __init__(self, name, age):
        self.name = name  # Instance attribute
        self.age = age    # Instance attribute

std = Student("Steve", 25)
print(std.schoolName)  # 'XYZ School'
print(std.name)       # 'Steve'
std.age = 20
print(std.age)        # 20
