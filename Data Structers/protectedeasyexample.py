class Student:
    _schoolName = 'XYZ School'  # Protected class attribute

    def __init__(self, name, age):
        self._name = name  # Protected instance attribute
        self._age = age    # Protected instance attribute

std = Student("Swati", 25)
print(std._name)  # 'Swati'
std._name = 'Dipa'
print(std._name)  # 'Dipa'
