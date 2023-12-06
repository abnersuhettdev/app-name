import { Inter } from "next/font/google";
import { useState } from "react";
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from "react-beautiful-dnd";

const inter = Inter({ subsets: ["latin"] });

type ItemProps = {
	id: string;
	content: string;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? "lightgreen" : "grey",

	// styles we need to apply on draggables
	...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
	background: isDraggingOver ? "lightblue" : "lightgrey",
	padding: grid,
	width: 250,
});
//gera lista de itens
const getItems = (count: number) =>
	Array.from({ length: count }, (v, k) => k).map((k) => ({
		id: `item-${k}`,
		content: `item ${k}`,
	}));

//reorganiza a lista de attay
const reorder = (list: ItemProps[], startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

export default function Home() {
	const [itemsList, setItemList] = useState<ItemProps[]>(getItems(10));

	function onDragEnd(result: DropResult) {
		if (!result.destination) {
			return;
		}

		const items = reorder(
			itemsList,
			result.source.index,
			result.destination.index
		);

		if (items) {
			setItemList(items);
		}
	}

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}
						>
							{itemsList &&
								itemsList?.map((item, index) => (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(
													snapshot.isDragging,
													provided.draggableProps.style
												)}
											>
												{item.content}
											</div>
										)}
									</Draggable>
								))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</main>
	);
}
