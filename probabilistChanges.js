class ProbabilistChanges {

    static randIncrementationOrDecrementation(value, positiveRate, valMin = Infinity * -1, valMax = Infinity){

        if (( positiveRate === 1 || positiveRate > Math.random() ) && value < valMax ) {
            value++;
        }
        else if ( value >= valMin )
        {
            value--;
        }

        return value;
    }


}