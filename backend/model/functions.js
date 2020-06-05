var functions={
    //1000
    calculateTime:function(test){
        var earliestTime;
        earliestTime=parseInt(test[0].startTime);
        for(var i=0;i<test.length;i++){            
            if(parseInt(test[i].startTime)<earliestTime){
                earliestTime=parseInt(test[i].startTime);
            }            
        }        
        return (earliestTime)
    }
}

module.exports=functions