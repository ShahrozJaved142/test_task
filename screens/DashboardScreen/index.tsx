import React from 'react';
import {
    SafeAreaView,
    FlatList,
    TextInput,
    ActivityIndicator,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Product } from './models';
import useController from './useController';
import styles from './styles';
import { Header } from '../../components';
import { EyeClosed, TabNotification } from '../../assets/icons';

const DashboardScreen = () => {

    const {
        products,
        search,
        loading,
        users,

        setSearch,
        handleSearch,
        loadMore,
    } = useController()

    const renderProductItem = ({ item }: { item: Product }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.title} - ${item.price}</Text>
            </View>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                RightIcon={() => <TabNotification />}
                avatarSource="https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
                userName={`${users?.name}`}
            />
            <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                value={search}

                onChangeText={setSearch}
                onSubmitEditing={handleSearch}
            />
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={loadMore}
                onEndReachedThreshold={1}
                ListFooterComponent={loading ? <ActivityIndicator /> : null}
            />
        </SafeAreaView>
    );
};

export default DashboardScreen;
