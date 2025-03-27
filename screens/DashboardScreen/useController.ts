import { useNavigation } from '@react-navigation/native';
import NavKeys, { NavigationProp } from '../../navigation/NavKeys';
import { Product } from './models';
import { useEffect, useState } from 'react';
import { getProductAPI } from '../../api/methods/session';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const useController = () => {
    const PAGE_SIZE = 50;
    const users = useSelector((state: RootState) => state.session.currentUser);
    const navigation = useNavigation<NavigationProp>();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const fetchProducts = async (newPage = 0) => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await getProductAPI({ PAGE_SIZE, newPage });
            const data = response.data.products;
            setProducts(prev => [...prev, ...data]);
            setFilteredProducts(prev => [...prev, ...data]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredProducts(products);
            setIsSearching(false);
        } else {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProducts(filtered);
            setIsSearching(true);
        }
    }, [search, products]);

    const handleSearch = () => {
        setPage(0);
        setIsSearching(true);
    };

    const loadMore = () => {
        if (!loading && !isSearching) setPage(prev => prev + 1);
    };

    const onPressLogin = () => {
        navigation.navigate(NavKeys.LoginScreen);
    };

    return {
        products: filteredProducts,
        search,
        loading: isSearching ? false : loading,
        users,

        setSearch,
        loadMore,
        handleSearch,
        onPressLogin,
    };
};

export default useController;
