import pandas as pd



import sys

print("MAKING LIST")

# get the list of command-line arguments
argv = sys.argv
air_int=int(argv[1])
cat_rank_int=int(argv[2])
seatval_int=int(argv[3])
quota_int=int(argv[4])
gender_int=int(argv[5])
print("hello")



def makehtml(airval,cat_rankval,seatval,quotaval,genderval):

    url="./JoSAA.html"
    data=pd.read_html(url)
    table=data[0]
    table["Closing Rank"]=table["Closing Rank"].str.replace("P","9999")
    # print(table)
    inplace=True
    # quotaval=2

    print(type(airval))
    print(airval)
    print(cat_rankval)
    print(seatval)
    print(quotaval)
    print(genderval)
    pd.set_option('display.max_columns', None)
    pd.set_option('display.max_rows', None)
    seat=[]
    gender=[]
    seat=["OPEN","EWS","OBC-NCL","SC","ST","OPEN (PwD)","EWS (PwD)","OBC-NCL (PwD)","SC (PwD)","ST (PwD)"]
    gender=["Gender-Neutral","Female-only (including Supernumerary)"]
    quota=["HS","OS","NONE"]
    
    filte=(table["Seat Type"]==seat[seatval]) & (table["Gender"]==gender[genderval])&((table["Quota"]=="AI")|(table["Quota"]==quota[quotaval]))
    table1=table[filte]

    
    table1["Closing Rank"]=table1["Closing Rank"].astype(int)


    finaltable=table1.sort_values(by="Closing Rank")


    a=finaltable.to_html("table.html")




makehtml(air_int,cat_rank_int,seatval_int,quota_int,gender_int)
