a = []
try:
    i=1
    while i<10:
        i+=1
        a.append(' ' * 10**1)
        print("Memory used: {}".format(len(a)))
except MemoryError:
    print("Memory used: {}".format(len(a) * 10**6))