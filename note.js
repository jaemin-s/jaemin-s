// function solution(brown, yellow) {
//     var answer = [];

//     const sum = brown + yellow;
//     console.log("sum", sum);
//     for (let i = 1; i < sum; i++) {
//         if (sum % i === 0) {
//             let j = sum / i;
//             let b = j >= i ? j : i;
//             let a = j >= i ? i : j;
//             if (brown === 4 * yellow + 4 - (yellow - 1) * 2) {
//                 answer = [b, a];
//             }
//         }
//     }
//     console.log(answer);
//     return answer;
// }

// solution(10, 2);
// solution(8, 1);
// solution(24, 24);

function solution(targets) {
    var answer = 0;
    const array = [...targets];
    array.sort((a, b) => {
        console.log("a", a);
    });
    console.log(array);

    return answer;
}

solution([
    [4, 5],
    [4, 8],
    [10, 14],
    [11, 13],
    [5, 12],
    [3, 7],
    [1, 4],
]);
