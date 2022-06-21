import styled from 'styled-components'

const RightSide = (props) => {
    return <Container>
        <FollowCard>
            <Title>
                <h2>Add to your feed</h2>
                <img src="/images/feed-icon.svg" alt="feed icon" />
            </Title>
            <Feedlist>
                <li>
                    <a>
                        <Avatar />
                    </a>
                    <div>
                        <span>#Linkedin</span>
                        <button>Follow</button>
                    </div>
                </li>
                <li>
                    <a>
                        <Avatar />
                    </a>
                    <div>
                        <span>#Video</span>
                        <button>Follow</button>
                    </div>
                </li>
            </Feedlist>
            <Recommendation>
                View all recommendations
                <img src="/images/right-icon.svg" alt="right icon" />
            </Recommendation>
        </FollowCard>
        <BannerCard>
            <img src="/images/banner-card.jpg" alt="banner card" />
        </BannerCard>
    </Container>
}

const Container = styled.div`
    grid-area: rightside;
`
const FollowCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 / 20%);
    padding: 12px;
`
const Title = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    width: 100%;
    color: rgba(0, 0, 0, 0.6);
`
const Feedlist = styled.ul`
    margin-top: 16px;
    li {
        display: flex;
        align-items: center;
        margin: 12px 0;
        font-size: 14px;
        & > div {
            display: flex;
            flex-direction: column;
        }
        button {
            background-color: transparent;
            color: rgba(0, 0, 0, 0.6);
            padding: 10px;
            align-items: center;
            border-radius: 15px;
            box-sizing: border-box;
            font-weight: 600;
            display: inline-flex;
            justify-content: center;
            max-height: 32px;
            max-width: 480px;
            text-align: center;
            outline: none;
            border: 2px solid rgba(10, 102, 194, 0.4);
        }
    }

`
const Avatar = styled.div`
    background-image: url("/images/avatar-hashtag.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 48px;
    height: 48px;
    margin-right: 8px;
`
const Recommendation = styled.a`
    color: #0a66c2;
    display: flex;
    align-items: center;
    font-size: 14px;
`
const BannerCard = styled(FollowCard)`
    img {
        width: 100%;
        height: 100%;
    }
`
export default RightSide;