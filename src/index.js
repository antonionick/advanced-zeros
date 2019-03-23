module.exports = function getZerosCount(number, base) {
	// array for results
	let result = [];
	let dividend = findDividend(base);

	// compute with each divisor
	for (let i = 0; i < dividend.length; i++) {
		let count_zero = 0;
		let nmb = number;

		// the number is divided by a divisor while the number more then 0
		while (nmb  > 0) {
			nmb  = Math.floor(nmb  / dividend[i][0]);
			count_zero += nmb ;
		}

		//divide count_zero by a count of repeated divisor
		count_zero = Math.floor(count_zero / dividend[i][1]);
		result.push(count_zero);
	}

	//return the least of result
	return Math.min(...result);
};

//count how many times divisors are repeated
function findDividend(base) {
	let arr = primeFactors(base);
	let result = [];

	while (arr.length > 0) {
		//max is divisor, count is count of repeated
		let max = Math.max(...arr);
		let count = 0;
		//length need, because by arr has max, max will delete from arr
		let length = arr.length;

		for (let i = 0; i < length; i++) {
			if (arr[i] === max) {
				count++;
				arr.splice(i, 1);
				i -= 2;
			}
		}
		result.push([max, count]);
	}

	return result;
}

//search prime Factors with the help of recursion
function primeFactors(number = 0, i = 2, arr = []) {
	// if number less then divider return arr dividers
	if (number < i) {
		return arr;
	}

	//if the number is divisible by i without remainder
	if (number % i === 0) {
		arr.push(i);
		number /= i;
	} else {
		i++;
	}

	return primeFactors(number, i, arr);
}