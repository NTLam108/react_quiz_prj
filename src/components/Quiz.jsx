import React, { useEffect, useState } from 'react'
import Results from './Results';
const quizData = [{
    "question": "Để ghép Vô Cực Kiếm, cần những trang bị thành phần nào?",
    "options": [
        "Kiếm BF + Găng Đấu Tập",
        "Kiếm BF + Cung Gỗ",
        "Gậy Quá Khổ + Nước Mắt",
        "Áo Choàng Bạc + Đai Khổng Lồ"
    ],
    "answer": "Kiếm BF + Găng Đấu Tập"
},
{
    "question": "Tộc/Hệ trong TFT dùng để làm gì?",
    "options": [
        "Tăng vàng mỗi vòng",
        "Kích hoạt hiệu ứng cộng thêm khi đủ số lượng tướng",
        "Giảm thời gian trận đấu",
        "Mở khóa bản đồ mới"
    ],
    "answer": "Kích hoạt hiệu ứng cộng thêm khi đủ số lượng tướng"
},
{
    "question": "Trong TFT, chuỗi thắng (win streak) giúp người chơi nhận thêm gì?",
    "options": [
        "Máu",
        "Vàng",
        "Trang bị hoàn chỉnh",
        "Tướng 5 vàng miễn phí"
    ],
    "answer": "Vàng"
},
{
    "question": "Tướng 3 sao được tạo thành khi nào?",
    "options": [
        "Có 2 bản sao tướng",
        "Có 3 bản sao tướng",
        "Có 9 bản sao tướng giống nhau",
        "Có 6 bản sao tướng"
    ],
    "answer": "Có 9 bản sao tướng giống nhau"
},
{
    "question": "Trang bị nào giúp hồi năng lượng khi gây sát thương?",
    "options": [
        "Ngọn Giáo Shojin",
        "Giáp Máu Warmog",
        "Vuốt Rồng",
        "Áo Choàng Thủy Ngân"
    ],
    "answer": "Ngọn Giáo Shojin"
},
{
    "question": "Trong TFT, người chơi bắt đầu trận đấu với bao nhiêu máu?",
    "options": [
        "80",
        "90",
        "100",
        "120"
    ],
    "answer": "100"
},
{
    "question": "Vòng đi chợ (Carousel) trong TFT cho phép người chơi làm gì?",
    "options": [
        "Mua tướng miễn phí",
        "Chọn tướng kèm trang bị",
        "Nhận thêm máu",
        "Đổi Lõi Công Nghệ"
    ],
    "answer": "Chọn tướng kèm trang bị"
},
{
    "question": "Trang bị nào giúp tướng miễn nhiễm hiệu ứng khống chế trong một khoảng thời gian đầu giao tranh?",
    "options": [
        "Áo Choàng Thủy Ngân",
        "Giáp Thiên Thần",
        "Giáp Gai",
        "Bùa Xanh"
    ],
    "answer": "Áo Choàng Thủy Ngân"
},
{
    "question": "Nếu bạn đang giữ 50 vàng và thắng liên tiếp 4 vòng, tối đa bạn có thể nhận bao nhiêu vàng trong một vòng (không tính vàng từ round đặc biệt)?",
    "options": [
        "8 vàng",
        "9 vàng",
        "10 vàng",
        "11 vàng"
    ],
    "answer": "10 vàng"
},
{
    "question": "Ở cấp 7, tỷ lệ xuất hiện tướng 4 vàng trong shop là bao nhiêu?",
    "options": [
        "10%",
        "15%",
        "20%",
        "25%"
    ],
    "answer": "15%"
}
]
const Quiz = () => {

    const [optionSelected, setOptionSelected] = useState("");
    const [userAnswer, setUserAnswer] = useState(
        Array.from({ length: quizData.length })
    );

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isQuizEnded, setIsQuizEnded] = useState(false);
    const [score, setScore] = useState(0);

    const handleSelectedOption = (option, index) => {

        if (option === quizData[currentQuestion].answer) {
            setScore((prev) => prev + 1)
        }

        setOptionSelected(option)
        //tao 1 copy moi
        const newUserAnswer = [...userAnswer];
        //cap nhat thay doi vao mang copy
        newUserAnswer[currentQuestion] = index;
        //dung setState de cap nhat state moi
        setUserAnswer(newUserAnswer);
    }

    const goNext = () => {
        if (currentQuestion === quizData.length - 1) {
            setIsQuizEnded(true)
        } else {
            setCurrentQuestion((prev) => prev + 1)
        }
    }

    const goBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1)
        }

    }

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setIsQuizEnded(false);
        setOptionSelected("");
        setScore(0);
        setUserAnswer(Array.from({ length: quizData.length }))
    };

    const reviewQuiz = () => {
        setCurrentQuestion(0);
        setIsQuizEnded(false);
    }

    useEffect(() => {
        const answer = Number(userAnswer[currentQuestion])
        const pastOptionSelected = quizData[currentQuestion].options[answer];

        if (answer !== undefined) {
            setOptionSelected(pastOptionSelected);
        } else {
            setOptionSelected("");
        }
    }, [currentQuestion, userAnswer])

    if (isQuizEnded) {
        return <Results
            score={score}
            totalQuestions={quizData.length}
            restartQuiz={restartQuiz}
            reviewQuiz={reviewQuiz}
        />
    }


    return (
        <>
            <h2>Câu {currentQuestion + 1}</h2>
            <p className='question'>{quizData[currentQuestion].question}</p>
            {quizData[currentQuestion].options.map((option, index) => (
                <button
                    key={option}
                    className={`option ${optionSelected === option ? "selected" : ""}`}
                    disabled={!!optionSelected && optionSelected !== option}
                    onClick={() => handleSelectedOption(option, index)}>{option}</button>))}

            {optionSelected ? (optionSelected === quizData[currentQuestion].answer ? (
                <p className='correct-answer'>Câu trả lời chính xác!</p>
            ) : (
                <p className='incorrect-answer'>Câu trả lời chưa chính xác!</p>
            )) : (
                ""
            )}

            <div className='nav-buttons'>
                <button
                    onClick={goBack}
                    disabled={currentQuestion === 0}>
                    Quay lại
                </button>
                <button
                    onClick={goNext}
                    disabled={!optionSelected}>
                    {currentQuestion === quizData.length - 1 ? "Nộp bài" : "Kế tiếp"}
                </button>
            </div>
        </>
    )
}

export default Quiz