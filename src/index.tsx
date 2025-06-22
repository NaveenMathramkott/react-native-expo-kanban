import { MaterialIcons } from "@expo/vector-icons"
import React, { useEffect, useRef, useState } from "react"
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    LayoutChangeEvent,
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native"
import { runOnJS } from "react-native-reanimated"
import { BoardHeader, CardData, ReactNativeKanbanBoardProps } from "./types"


const ReactNativeKanbanBoard = ({
    boardHeaderData = [],
    boardCardData = {},
    onCardPress = () => { },
    onBoardChange = () => { },
    onAddCard = () => { },
    onDeleteLead = () => Promise.resolve(),
    cardStyle = {},
    priorityColors = {
        "high": "#FF5252",
        "medium": "#FFC107",
        "low": "#4CAF50",
    },
    isLoading = false,
}: ReactNativeKanbanBoardProps) => {
    const [draggingItemId, setDraggingItemId] = useState<string | number | null>(null)
    const [draggingBoardId, setDraggingBoardId] = useState<string | number | null>(null)
    const [boardLayouts, setBoardLayouts] = useState<{ [key: string]: { x: number; width: number } }>({})
    const horizontalScrollRef = useRef<ScrollView>(null)

    const [orientation, setOrientation] = useState(
        Dimensions.get("window").width > Dimensions.get("window").height
            ? "LANDSCAPE"
            : "PORTRAIT"
    )
    const scrollX = useRef(new Animated.Value(0)).current
    const scrollViewWidth = useRef(0)
    const boardRefs = useRef<{ [key: string]: React.RefObject<View> }>({})
    const [currentlyUpdating, setCurrentlyUpdating] = useState({
        itemId: null as string | number | null,
        sourceBoardId: null as string | number | null,
        targetBoardId: null as string | number | null,
    })
    const layoutMeasurementQueue = useRef<{ boardId: string | number; x: number; width: number }[]>([])

    const scrollBarWidth = useRef(new Animated.Value(0)).current
    const scrollBarPosition = useRef(new Animated.Value(0)).current
    const { width: windowWidth, height: windowHeight } = useWindowDimensions()
    const isTablet = windowWidth >= 768

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setOrientation(window.width > window.height ? "LANDSCAPE" : "PORTRAIT")
        })
        return () => subscription?.remove()
    }, [])

    const getBoardWidth = () => {
        const boardCount = boardHeaderData.length || 1

        if (orientation === "LANDSCAPE") {
            const visibleBoards = isTablet ? 4 : 3
            const totalMargin = 24
            const calculatedWidth = windowWidth / visibleBoards - totalMargin
            return Math.max(calculatedWidth, 280)
        } else {
            // On tablet
            if (isTablet) {
                const visibleBoards = Math.min(boardCount, 4)
                const totalMargin = 24
                return windowWidth / visibleBoards - totalMargin
            } else {
                // On mobile in portrait
                const minWidth = Math.max(windowWidth * 0.2, 300)
                return minWidth
            }
        }
    }

    const moveItemToBoard = async (
        itemId: string | number,
        sourceBoardId: string | number,
        targetBoardId: string | number
    ) => {
        setCurrentlyUpdating({ itemId, sourceBoardId, targetBoardId })

        try {
            // Finding the target board
            const sourceBoard = boardCardData[sourceBoardId]
            const itemIndex = sourceBoard.columnData.findIndex(
                (item) => item.id === itemId
            )

            if (itemIndex === -1) {
                throw new Error("Item not found")
            }

            const itemToMove = sourceBoard.columnData[itemIndex]

            const newData = {
                ...boardCardData,
                [sourceBoardId]: {
                    ...boardCardData[sourceBoardId],
                    columnData: boardCardData[sourceBoardId].columnData.filter(
                        (item) => item.id !== itemId
                    ),
                    total_count: boardCardData[sourceBoardId].total_count - 1,
                },
                [targetBoardId]: {
                    ...boardCardData[targetBoardId],
                    columnData: [...boardCardData[targetBoardId].columnData, itemToMove],
                    total_count: boardCardData[targetBoardId].total_count + 1,
                },
            }

            onBoardChange(newData)
        } catch (error) {
            console.error("Failed to update card status:", error)
        } finally {
            setCurrentlyUpdating({
                itemId: null,
                sourceBoardId: null,
                targetBoardId: null,
            })
        }
    }

    const measureBoard = (boardId: string | number, event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout
        const boardIndex = boardHeaderData.findIndex((b) => b.id === boardId)
        const margin = 12
        let absoluteX = boardIndex * (width + margin * 2)

        layoutMeasurementQueue.current.push({ boardId, x: absoluteX, width })
        if (layoutMeasurementQueue.current.length === boardHeaderData.length) {
            const newLayouts: { [key: string]: { x: number; width: number } } = {}
            layoutMeasurementQueue.current.forEach(({ boardId, x, width }) => {
                newLayouts[boardId] = { x, width }
            })
            setBoardLayouts(newLayouts)
            layoutMeasurementQueue.current = []
        }
    }

    const moveItem = async (
        itemId: string | number,
        sourceBoardId: string | number,
        targetBoardId: string | number,
        item: CardData
    ) => {
        if (sourceBoardId === targetBoardId) return
        await moveItemToBoard(itemId, sourceBoardId, targetBoardId)
    }

    const getBoardAtPosition = (x: number) => {
        "worklet"
        const currentScrollX = scrollX?._value || 0
        const absoluteX = x + currentScrollX

        const boards = Object.entries(boardLayouts)
            .map(([id, layout]) => ({ id, ...layout }))
            .sort((a, b) => a.x - b.x)

        for (const board of boards) {
            const boardStart = board.x
            const boardEnd = board.x + board.width
            if (absoluteX >= boardStart && absoluteX <= boardEnd) {
                return board.id
            }
        }

        let closestBoard = null
        let minDistance = Infinity
        for (const board of boards) {
            const distance = Math.min(
                Math.abs(absoluteX - board.x),
                Math.abs(absoluteX - (board.x + board.width))
            )
            if (distance < minDistance) {
                minDistance = distance
                closestBoard = board.id
            }
        }

        return closestBoard
    }

    const KanbanCard = ({
        item,
        boardId,
    }: {
        item: CardData
        boardId: number | string
    }) => {
        const pan = useRef(new Animated.ValueXY()).current
        const cardOpacity = useRef(new Animated.Value(1)).current
        const autoScrollInterval = useRef<NodeJS.Timeout | null>(null)
        const [isDragging, setIsDragging] = useState(false)
        const edgeThreshold = isTablet ? 100 : 60
        const isCurrentItemUpdating =
            currentlyUpdating.itemId === item.id &&
            currentlyUpdating.sourceBoardId === boardId

        const handleDelete = () => {
            onDeleteLead(item.id, boardId)
        }

        const handleAutoScroll = (gestureX: number) => {
            "worklet"
            if (!horizontalScrollRef.current) return

            const currentScrollValue = scrollX?._value || 0
            const maxScroll = scrollViewWidth.current - windowWidth
            const scrollIncrement = isTablet ? 40 : 25

            if (
                gestureX > windowWidth - edgeThreshold &&
                currentScrollValue < maxScroll
            ) {
                const newScrollValue = Math.min(
                    currentScrollValue + scrollIncrement,
                    maxScroll
                )
                Animated.timing(scrollX, {
                    toValue: newScrollValue,
                    duration: 10,
                    useNativeDriver: true,
                }).start(() => {
                    runOnJS(() => {
                        horizontalScrollRef.current?.scrollTo({
                            x: newScrollValue,
                            animated: false,
                        })
                    })()
                })
            } else if (gestureX < edgeThreshold && currentScrollValue > 0) {
                const newScrollValue = Math.max(
                    currentScrollValue - scrollIncrement,
                    0
                )
                Animated.timing(scrollX, {
                    toValue: newScrollValue,
                    duration: 10,
                    useNativeDriver: true,
                }).start(() => {
                    runOnJS(() => {
                        horizontalScrollRef.current?.scrollTo({
                            x: newScrollValue,
                            animated: false,
                        })
                    })()
                })
            }
        }

        const hamburgerPanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                "worklet"
                runOnJS(setIsDragging)(true)
                runOnJS(setDraggingItemId)(item.id)
                runOnJS(setDraggingBoardId)(boardId)

                Animated.timing(cardOpacity, {
                    toValue: 0.5,
                    duration: 100,
                    useNativeDriver: false,
                }).start()

                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value,
                })
                pan.setValue({ x: 0, y: 0 })
            },
            onPanResponderMove: (e, gesture) => {
                "worklet"
                if (isDragging) {
                    Animated.event([null, { dx: pan.x, dy: pan.y }], {
                        useNativeDriver: false,
                    })(e, gesture)

                    if (!autoScrollInterval.current) {
                        autoScrollInterval.current = setInterval(() => {
                            runOnJS(handleAutoScroll)(gesture.moveX)
                        }, 16)
                    }
                }
            },
            onPanResponderRelease: (e, gesture) => {
                "worklet"
                if (autoScrollInterval.current) {
                    clearInterval(autoScrollInterval.current)
                    autoScrollInterval.current = null
                }

                if (isDragging) {
                    pan.flattenOffset()

                    Animated.timing(cardOpacity, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: false,
                    }).start()

                    const targetBoardId = getBoardAtPosition(gesture.moveX)
                    if (targetBoardId && targetBoardId !== boardId) {
                        runOnJS(moveItem)(item.id, boardId, targetBoardId, item)
                    }

                    pan.setValue({ x: 0, y: 0 })
                    runOnJS(setDraggingItemId)(null)
                    runOnJS(setDraggingBoardId)(null)
                    runOnJS(setIsDragging)(false)
                }
            },
            onPanResponderTerminate: () => {
                "worklet"
                if (autoScrollInterval.current) {
                    clearInterval(autoScrollInterval.current)
                    autoScrollInterval.current = null
                }

                if (isDragging) {
                    pan.flattenOffset()
                    pan.setValue({ x: 0, y: 0 })

                    Animated.timing(cardOpacity, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: false,
                    }).start()

                    runOnJS(setDraggingItemId)(null)
                    runOnJS(setDraggingBoardId)(null)
                    runOnJS(setIsDragging)(false)
                }
            },
        })

        const handleCardPress = () => {
            onCardPress(item)
        }

        return (
            <TouchableOpacity activeOpacity={0.9} onPress={handleCardPress}>
                <Animated.View
                    style={[
                        styles.card,
                        cardStyle,
                        {
                            opacity: cardOpacity,
                            transform: [{ translateX: pan.x }, { translateY: pan.y }],
                            zIndex: isDragging ? 999 : 1,
                            elevation: isDragging ? 5 : 2,
                            borderLeftWidth: 6,
                            borderLeftColor: priorityColors[item.priority] || "#000",
                            width: orientation === "LANDSCAPE" ? "100%" : undefined,
                        },
                    ]}
                >
                    {isLoading && isCurrentItemUpdating && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="small" color="#fff" />
                        </View>
                    )}

                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderLeft}>
                            <Text style={styles.cardTitle} numberOfLines={1}>
                                {item.first_name} {item.last_name}
                            </Text>
                            <Text style={styles.cardSubtitle} numberOfLines={1}>
                                {item.company}
                            </Text>
                        </View>

                        <View style={styles.cardHeaderRight}>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={handleDelete}
                            >
                                <MaterialIcons name="delete" size={20} color="#FF5252" />
                            </TouchableOpacity>

                            <View
                                style={[
                                    styles.hamburgerContainer,
                                    {
                                        backgroundColor: priorityColors[item.priority] || "#e0e0e0",
                                    },
                                ]}
                                {...hamburgerPanResponder.panHandlers}
                            >
                                <MaterialIcons name="drag-handle" size={20} color="#fff" />
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardContent}>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="email" size={16} color="#666" />
                            <Text style={styles.infoText} numberOfLines={1}>
                                {item.email}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <MaterialIcons name="phone" size={16} color="#666" />
                            <Text style={styles.infoText} numberOfLines={1}>
                                {item.phone}
                            </Text>
                        </View>

                        {item.notes && (
                            <View style={styles.notesContainer}>
                                <MaterialIcons name="notes" size={16} color="#666" />
                                <Text style={styles.notesText} numberOfLines={2}>
                                    {item.notes}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.cardFooter}>
                        <View style={styles.userContainer}>
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>
                                    {item.assigned_to.first_name.charAt(0)}
                                    {item.assigned_to.last_name?.charAt(0) || ""}
                                </Text>
                            </View>
                            <Text style={styles.userName}>
                                {item.assigned_to.first_name} {item.assigned_to.last_name}
                            </Text>
                        </View>

                        <Text style={styles.dateText}>
                            {new Date(item.created_on).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })}
                        </Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    const renderBoard = (board: BoardHeader) => {
        if (!boardRefs.current[board.id]) {
            boardRefs.current[board.id] = React.createRef<View>()
        }

        const kanbanCardData = boardCardData[board.id] || {
            columnData: [],
            total_count: 0,
        }

        const handleAddLeadPress = () => {
            onAddCard(board.id)
        }

        return (
            <View
                key={board.id.toString()}
                style={[
                    styles.board,
                    {
                        width: getBoardWidth(),
                        marginHorizontal: isTablet ? 12 : 10,
                        maxHeight: windowHeight,
                        ...(orientation === "LANDSCAPE" && {
                            marginBottom: 16,
                        }),
                    },
                ]}
                ref={boardRefs.current[board.id]}
                onLayout={(event) => measureBoard(board.id, event)}
            >
                <View
                    style={[
                        styles.boardHeader,
                        {
                            borderBottomColor: board.color,
                            paddingVertical: isTablet ? 12 : 8,
                        },
                    ]}
                >
                    <View style={styles.boardHeaderLabel}>
                        <Text
                            style={[
                                styles.boardTitle,
                                {
                                    fontSize: isTablet ? 16 : 16,
                                    maxWidth: isTablet ? 180 : 100,
                                },
                            ]}
                            numberOfLines={1}
                        >
                            {board.status}
                        </Text>
                        <View style={styles.countBadge}>
                            <Text
                                style={[styles.countText, { fontSize: isTablet ? 14 : 12 }]}
                            >
                                {kanbanCardData?.total_count || 0}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.boardFooter}>
                        <TouchableOpacity
                            style={styles.addCardButton}
                            onPress={handleAddLeadPress}
                        >
                            <MaterialIcons name="add" size={24} color="#4A5568" />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    style={styles.boardContent}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.boardContentContainer,
                        {
                            padding: isTablet ? 16 : 12,
                            paddingBottom: isTablet ? 32 : 24,
                        },
                    ]}
                >
                    {kanbanCardData?.columnData?.map((item) => (
                        <KanbanCard key={item.id.toString()} item={item} boardId={board.id} />
                    ))}
                </ScrollView>
            </View>
        )
    }

    const updateScrollBar = (contentWidth: number, scrollXValue: number) => {
        "worklet"
        const scrollBarRatio = windowWidth / contentWidth
        const scrollBarWidthValue = windowWidth * scrollBarRatio
        const scrollBarPositionValue = scrollXValue * scrollBarRatio

        Animated.parallel([
            Animated.timing(scrollBarWidth, {
                toValue: scrollBarWidthValue,
                duration: 0,
                useNativeDriver: false,
            }),
            Animated.timing(scrollBarPosition, {
                toValue: scrollBarPositionValue,
                duration: 0,
                useNativeDriver: false,
            }),
        ]).start()
    }

    const handleScrollViewRef = (ref: ScrollView) => {
        horizontalScrollRef.current = ref
        if (ref && scrollX) {
            scrollX.addListener(({ value }) => {
                "worklet"
                if (scrollViewWidth.current > 0) {
                    runOnJS(updateScrollBar)(scrollViewWidth.current, value)
                }
            })
        }
    }

    const handleScrollViewLayout = (event: LayoutChangeEvent) => {
        "worklet"
        const { width } = event.nativeEvent.layout
        scrollViewWidth.current = width
        updateScrollBar(width, 0)
    }

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={[styles.boardsContainer, { width: windowWidth }]}
                contentContainerStyle={{
                    paddingHorizontal: orientation === "LANDSCAPE" ? 12 : 0,
                }}
                ref={handleScrollViewRef}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                snapToInterval={
                    orientation === "PORTRAIT" && !isTablet
                        ? getBoardWidth() + 20
                        : undefined
                }
                snapToAlignment={
                    orientation === "PORTRAIT" && !isTablet ? "start" : undefined
                }
                decelerationRate="fast"
                onContentSizeChange={(width) => {
                    "worklet"
                    scrollViewWidth.current = width
                }}
                onLayout={handleScrollViewLayout}
            >
                {boardHeaderData?.length > 0 ? (
                    boardHeaderData?.map((board) => (
                        <View key={board.id.toString()}>{renderBoard(board)}</View>
                    ))
                ) : (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            width: windowWidth,
                        }}
                    >
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    boardsContainer: {
        flex: 1,
        paddingVertical: 16,
        backgroundColor: "#F5F7FA",
    },
    board: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        height: "100%",
        maxHeight: "100%",
        minWidth: 280,
    },
    boardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    boardTitle: {
        fontWeight: "700",
        color: "#2D3748",
        fontSize: 16,
    },
    countBadge: {
        backgroundColor: "#EDF2F7",
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: 8,
    },
    countText: {
        fontWeight: "600",
        color: "#4A5568",
        fontSize: 12,
    },
    boardContent: {
        flex: 1,
        paddingHorizontal: 8,
    },
    boardContentContainer: {
        paddingBottom: 16,
    },
    boardHeaderLabel: {
        flexDirection: "row",
        alignItems: "center",
    },
    boardFooter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    addCardButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EDF2F7",
        borderRadius: 8,
        padding: 10,
    },
    addCardButtonText: {
        color: "#4A5568",
        fontWeight: "500",
        marginLeft: 8,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
        padding: 16,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    cardHeaderLeft: {
        flex: 1,
        marginRight: 8,
    },
    cardHeaderRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardTitle: {
        fontWeight: "600",
        color: "#1A202C",
        fontSize: 16,
        marginBottom: 4,
    },
    cardSubtitle: {
        color: "#4A5568",
        fontSize: 14,
        marginBottom: 8,
    },
    cardContent: {
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    infoText: {
        color: "#4A5568",
        fontSize: 13,
        marginLeft: 8,
        flex: 1,
    },
    notesContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 8,
    },
    notesText: {
        color: "#4A5568",
        fontSize: 13,
        marginLeft: 8,
        flex: 1,
        fontStyle: "italic",
    },
    cardFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#EDF2F7",
        paddingTop: 12,
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    avatarText: {
        color: "#4A5568",
        fontWeight: "600",
        fontSize: 12,
    },
    userName: {
        color: "#4A5568",
        fontSize: 12,
        fontWeight: "500",
    },
    dateText: {
        color: "#A0AEC0",
        fontSize: 12,
    },
    hamburgerContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
    },
    deleteButton: {
        padding: 4,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 12,
        width: "90%",
        maxWidth: 400,
        padding: 20,
    },

    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        color: "#4A5568",
        marginBottom: 8,
        fontWeight: "500",
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#F8FAFC",
    },
    priorityContainer: {
        marginBottom: 20,
    },
    priorityOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    priorityButton: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 6,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    priorityText: {
        color: "#fff",
        fontWeight: "500",
    },
    cancelButton: {
        backgroundColor: "#EDF2F7",
        marginRight: 8,
    },
    submitButton: {
        backgroundColor: "#4C51BF",
        marginLeft: 8,
    },
    modalButtonText: {
        fontWeight: "600",
    },
})

export default ReactNativeKanbanBoard
