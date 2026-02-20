import React from 'react'

const Results = ({ score, totalQuestions, restartQuiz, reviewQuiz }) => {
    return (
        <div>
            <h2>Kết Quả</h2>
            <p className='result'>Bạn trả lời đúng {score}/{totalQuestions} câu!</p>
            <div className='resultButtonsContainer'>
                <button
                    className='result-button'
                    onClick={reviewQuiz}>
                    Xem Lại</button>
                <button
                    className='result-button'
                    onClick={restartQuiz}>
                    Làm Lại</button>
            </div>
        </div>
    )
}

export default Results