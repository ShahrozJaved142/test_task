import { AxiosResponse } from 'axios';

interface CommonPayload {
    _id: string;
    payload: any;
    onSuccess: (data?: any) => void;
    onError: (error?: any) => void;
}

interface CommonResponse { response: any }

interface Section {
    title: string; isOpen: boolean;
}

interface LocationInfo {
    city?: string;
    country?: string;
    ip?: string;
    loc?: string;
    org?: string;
    postal?: string;
    region?: string;
    timezone?: string;
};

export type {
    CommonPayload,
    CommonResponse,
    Section,
    LocationInfo,
}

export interface Slide {
    id: string;
    title: string;
    description: string;
    image: any;
  }