import { Candidate } from "@prisma/client";
import { prisma } from "../config/database";
import { CandidateData } from "../interfaces/candidateInterface";
import { conflictError, notFoundError } from "../utils/errorUtils";

const create = async (body: CandidateData) => {
  const result = await prisma.candidate.create({ data: body });

  return result;
};

const getCandidates = async () => {
  const result = await prisma.candidate.findMany({
    orderBy: { createdAt: "desc" },take:5,
    select: {
      id: true,
      name: true,
      email: true,
      curriculum: true,
    },
  });

  return result;
};

const getJobDescription = async (link:string) =>{
    

  const result = await prisma.job.findFirst({where:{link:link},

      select:{
                  id:true,
                  name:true,
                  link:true,
                  createdAt:true,
                  description:true,
                  active:true,
                  tags:{
                      select:{
                         tags:{
                          select:{
                              name:true,
                          }
                         }
                      }
                  },
                  experience:{
                      select:{
                          experience:{
                              select:{
                                  name:true,
                              }
                          }
                      }
                  },
      
      }
      
  });

  if(!result) throw notFoundError("Job not Found")

  return result
}

export { create, getCandidates, getJobDescription };
