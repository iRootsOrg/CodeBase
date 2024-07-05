def fib(n):
    return fib(n - 1) + fib(n - 2) if n > 1 else n

inputs = input().split()
a = int(inputs[0])
b = int(inputs[1])
c = int(inputs[2])
d = int(inputs[3])
print(fib(a))
print(fib(b))
print(fib(c))
print(fib(d))
