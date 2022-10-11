
import { Candidate } from '@prisma/client';
import Joi from "joi";
import * as candidateRepository from '../repositories/candidateRepository'
import { wrongSchemaError } from '../utils/errorUtils';

const create = async (candidateData:Omit<Candidate, 'id'>) =>{

    const result = await candidateRepository.create(candidateData)

    return result
}

const getCandidates = async () =>{

    const result = await candidateRepository.getCandidates()

    return result
}

const getJobDescription = async (link:string) =>{

    const result = await candidateRepository.getJobDescription(link)

    return result
}

export { create, getCandidates , getJobDescription}