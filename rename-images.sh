for d in * ; do 
    echo ">>> $d"
    i=0
    for f in $d/*png ; do 
        in=$f
        out="$d/`printf "%05d.png" $i`"
        
        printf " - %s --> %s\n" $in $out
        
        mv $in ${out}_ ; ((i=$i+1))
    done
    
    for f in $d/*png_ ; do 
        mv $f ${f/png_/png}
    done
done
