{(({index}) => (Item && (
    <div className='banner-item'>

        <div className="img-container">
            <img
                src={BaseApi + prodImg
                ?.url}
                alt={prodName}/>

        </div>

        <h4>{prodName}</h4>
        <h4>
            <strong>
                {FormatCurrency.format(prodPrice)}

            </strong>
        </h4>

    </div>
)))}
