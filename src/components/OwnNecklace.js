import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { necklaceListThumb, necklaceList, bigJewelList, smallJewelList } from "./necklaceData";
import { Component } from "react";

const Panel = styled.div`
    position: relative;
    height: 100%;
`;

const NecklaceSelector = styled.div`
    // position: absolute;
    // top: 2rem;
    // left: 50%;
    // transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    z-index: 9999;
    width: 100%;
`;

const Necklace = styled.div`
    border-radius: 1000px;
    border: 2px solid ${props => props.active ? "rgb(98,98,98)" : "rgb(225,225,225)"};
    width: 4rem;
    height: 4rem;
    margin: 0 1rem;
    overflow: hidden;
`;

const SelectedNecklace = styled.div`
    width: 500px;
    height: 500px;
    margin: auto;
    position: relative;
    margin-bottom: 5rem;
`;

const BigJewelDroppable = styled.div`
    position: absolute;
    left: ${props => props.left}%;
    top: ${props => props.top}%;
    width: 5rem;
    height: 5rem;
    transform: translateX(-50%);
    border: 2px dotted gray;
    border-radius: 1000px;
`;

const SmallJewelDroppable = styled.div`
    position: absolute;
    left: ${props => props.left}%;
    top: ${props => props.top}%;
    min-width: 3.5rem;
    min-height: 3.5rem;
    transform: translateX(-50%);
    border: 2px dotted gray;
    border-radius: 1000px;
`;

const BJewelGroup = styled.div`
    width: 80%;
    margin: auto;
    height: 7rem;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: auto;
`;

const BJewel = styled.img`
    width: 5rem;
    height: 5rem;
    border-radius: 1000px;
    overflow: hidden;
`;

const SJewelGroup = styled.div`
    width: 80%;
    margin: auto;
    height: 7rem;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: auto;
`;

const SJewel = styled.img`
    width: 5rem;
    height: 5rem;
    border-radius: 1000px;
    overflow: hidden;
`;

const Container = styled.div`
    margin-bottom: 8px;
    border-radius: 2px;
    background-color: transparent;
    box-sizing: border-box;
    text-align: center;
    font-size: 15px;
    // position: absolute;
    // left: ${props => props.left}px;
    // top: ${props => props.top}px;
    // border: 1px solid;
`;

class OwnNecklace extends React.Component {
    state = {
        activeNecklace: 0,
        activeBigJewelId: "",
        activeSmallJewelIds: [],
    }

    onDragEnd = (result) => {
        let {
            activeNecklace,
            activeSmallJewelIds
        } = this.state;
        const { destination, source, draggableId } = result;
        // console.log(destination, source, draggableId);
        // console.log(destination.droppableId !== "smallJewelSelected-0" || destination.droppableId !== "smallJewelSelected-1")
        if (
            (destination && destination.droppableId === "bigJewelSelected") || 
            (destination && (
                // destination.droppableId === "smallJewelSelected-0" || 
                // destination.droppableId === "smallJewelSelected-1" ||
                necklaceList[activeNecklace].sPos.map((pos,id) => `smallJewelSelected-${id}`).indexOf(destination.droppableId) >= 0
            ))
        ) {
            if (
                destination.droppableId === "bigJewelSelected"
            ) {
                this.setState({
                    activeBigJewelId: draggableId
                })
            }
            console.log("==========PASSED==========");
            let smallJewelLength = necklaceList[activeNecklace].sPos.length;
            for (let i = 0; i < smallJewelLength; i ++) {
                if (
                    destination.droppableId === `smallJewelSelected-${i}`
                ) {
                    console.log("Inner")
                    this.setState(oldVal => ({
                        activeSmallJewelIds: necklaceList[activeNecklace].sPos.map((pos, id) => {
                            return id === i ? draggableId : oldVal.activeSmallJewelIds[id]
                        })
                    }))
                }
            }
        }
    }

    render() {
        let {
            activeNecklace,
            activeBigJewelId,
            activeSmallJewelIds
        } =  this.state;
        console.log(smallJewelList.filter(smallJewel => activeSmallJewelIds.indexOf(smallJewel.id) > 0))
        return (
            <Panel>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <NecklaceSelector>
                        {necklaceListThumb.map((necklace,id) => {
                            return (
                            <Necklace 
                                key={id}
                                active={id == activeNecklace}
                                onClick={() => this.setState({activeNecklace: id})}
                            >
                                <img style={{width: "100%", height: "100%"}} src={necklace.img} alt={id}></img>
                            </Necklace>)
                        })}
                    </NecklaceSelector>
                    <SelectedNecklace>
                        <img style={{width: "100%", height: "100%"}} src={necklaceList[activeNecklace].img} alt="Selected Necklace"></img>
                        <BigJewelDroppable
                            left={necklaceList[activeNecklace].bigPosX}
                            top={necklaceList[activeNecklace].bigPosY}
                        >
                            <Droppable 
                                droppableId={"bigJewelSelected"}
                            >
                                {(provided) => (
                                    <Container
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {activeBigJewelId !== "" ? (
                                            <BJewel 
                                                src={bigJewelList.filter(bigJewel => bigJewel.id == activeBigJewelId)[0]?.img} 
                                                alt={bigJewelList.filter(bigJewel => bigJewel.id == activeBigJewelId)[0]?.id} 
                                            ></BJewel>
                                        ) : ""}
                                        {provided.placeholder}
                                    </Container>
                                )}
                            </Droppable>
                        </BigJewelDroppable>
                        {necklaceList[activeNecklace].sPos.map((pos, id) => {
                            return (
                                <SmallJewelDroppable 
                                    key={id}
                                    left={necklaceList[activeNecklace].sPos[id].x}
                                    top={necklaceList[activeNecklace].sPos[id].y}
                                >
                                    <Droppable 
                                        droppableId={`smallJewelSelected-${id}`}
                                    >
                                        {(provided) => (
                                            <Container
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {smallJewelList.filter((smallJewelId) => smallJewelId.id === activeSmallJewelIds[id]).map(
                                                    (filteredSmallJewel, iid) => {
                                                        return (
                                                            <SJewel src={filteredSmallJewel.img} alt={iid} style={{
                                                                transform: `rotate(${pos.rotate}deg)`,
                                                                marginLeft: `${pos.ml}px`,
                                                            }}></SJewel>
                                                        )
                                                    }
                                                )}
                                                {provided.placeholder}
                                            </Container>
                                        )}
                                    </Droppable>
                                </SmallJewelDroppable>
                            )
                        })}
                    </SelectedNecklace>
                    <a 
                        href={`
                            http://localhost:8080/api/necklacedownload?necklace=${necklaceList[activeNecklace].img}
                            &bigJewel=${bigJewelList.filter(bigJewel => bigJewel.id === activeBigJewelId)[0]?.img}
                            &bigJewelPos=${necklaceList[activeNecklace].bigPosX},${necklaceList[activeNecklace].bigPosY}
                            &smallJewel=${activeSmallJewelIds.map(activeSmallJewelId => smallJewelList.filter(smallJewel => smallJewel.id === activeSmallJewelId)[0]?.img)?.join(",")}
                            &smallJewelPos=${necklaceList[activeNecklace].sPos.map(pos => `{"x": "${pos.x}","y": "${pos.y}","rotate": "${pos.rotate}","ml": "${pos.ml}"}`).join("|")}
                        `}
                        target="_blank"
                        style={{
                            position: "absolute",
                            marginTop: "-50px",
                        }} 
                    >Save</a>
                    <Droppable 
                        droppableId={"bigJewelGroup"}
                    >
                        {(provided) => (
                            <Container
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                // top={700}
                            >
                                <BJewelGroup >
                                {bigJewelList.map((bjewel,id) => {
                                    return (
                                        <Draggable key={bjewel.id} draggableId={bjewel.id} index={id}>
                                        {(provided) => (
                                            <Container
                                                {...provided.draggableProps} 
                                                {...provided.dragHandleProps} 
                                                ref={provided.innerRef} 
                                                // left={id*80}
                                                // top={0}
                                            >
                                                <BJewel 
                                                    src={bjewel.img} 
                                                    alt={id} 
                                                ></BJewel>
                                            </Container>
                                        )}
                                        </Draggable>
                                    )
                                })}
                                </BJewelGroup>
                            </Container>
                            )
                        }
                    </Droppable>
                    
                    <Droppable 
                        droppableId={"smallJewelGroup"}
                    >
                        {(provided) => (
                            <Container
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                // top={800}
                            >
                                <SJewelGroup>
                                {smallJewelList.map((sjewel,id) => {
                                    return (
                                        <Draggable key={sjewel.id} draggableId={sjewel.id} index={id}>
                                        {(provided) => (
                                            <Container
                                                {...provided.draggableProps} 
                                                {...provided.dragHandleProps} 
                                                ref={provided.innerRef} 
                                                // left={id*80}
                                                // top={0}
                                            >
                                                <SJewel src={sjewel.img} alt={id}></SJewel>
                                            </Container>
                                        )}
                                        </Draggable>
                                    )
                                })}
                                </SJewelGroup>
                            </Container>
                        )}
                    </Droppable>
                </DragDropContext>
            </Panel>
        )
    }
}

export default OwnNecklace;